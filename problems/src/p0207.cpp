#include <iostream>

class S {
    int v = 1;
    friend void h(S&);
public:
    int get() const { return v; }
};

void h(S& s) {
    s.v += 2;
    std::cout << s.v;
}

int main() {
    S s;
    h(s);
    std::cout << s.get() << "\n";
}
