#include <iostream>

struct T {
    char c;
    explicit T(char x) : c(x) { std::cout << c; }
    ~T() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

struct Bad {
    explicit Bad(char c) {
        std::cout << c;
        throw 1;
    }
};

class Base {
    T b;
public:
    Base() : b('p') { std::cout << '1'; }
    ~Base() { std::cout << '2'; }
};

class Der : public Base {
    T d;
    Bad x;
    T e;
public:
    Der() : e('s'), x('r'), d('q') { std::cout << '3'; }
    ~Der() { std::cout << '4'; }
};

int main() {
    try {
        Der obj;
        (void)obj;
        std::cout << 'z';
    } catch (...) {
        std::cout << 'm';
    }
    std::cout << "\n";
}
