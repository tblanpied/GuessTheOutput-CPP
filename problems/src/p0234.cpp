#include <iostream>

void f(int) { std::cout << 'b'; }

class S {
    friend void f(S) { std::cout << 'a'; }
};

int main() {
    S s;
    f(s);
    f(0);
    std::cout << "\n";
}
