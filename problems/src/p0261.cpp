#include <iostream>
#include <new>

struct S {
    S() { std::cout << 'a'; }
    ~S() { std::cout << 'b'; }
};

int main() {
    alignas(S) unsigned char buf[sizeof(S)];

    S* p = new (buf) S;
    std::cout << 'c';
    p->~S();
    std::cout << 'd' << "\n";
}
